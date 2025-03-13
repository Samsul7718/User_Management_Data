import axios from "axios";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const options = {
  selectableRows: "none",
  print: true,
  download: true,
  viewColumns: true,
  filter: true,
  //   filterType: "checkbox",
};

const Home = () => {
  const [data, setData] = useState([]);

  const MuiTheme = () =>
    createTheme({
      typography: {
        // fontFamily: "Poppins",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              font: "bold",
              fontSize: "3rem",
              //   padding: "10px",
              //   fontWeight: 700,
            },
          },
        },
      },
    });

  // Delete user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        const updatedUsers = data.filter((u) => u.id !== id);
        const reassignedUsers = updatedUsers.map((user, index) => ({
          ...user,
          id: (index + 1).toString(),
        }));
        setData(reassignedUsers);

        // Update the db.json file with reassigned users
        axios.update("http://localhost:3001/users", reassignedUsers);
        //   .then(() => {
        //     console.log("User deleted and IDs reassigned", reassignedUsers);
        //   });
        console.log("User deleted", reassignedUsers);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        let manual = res?.data?.map((res) => ({
          ...res,
          name: res?.FirstName + " " + res?.LastName,
        }));
        setData(manual);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "S.No",
      options: {
        customBodyRender: (values, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "id",
    },
    {
      name: "name",
    },
    {
      name: "email",
    },
    {
      name: "gender",
      options: {
        customBodyRender: (values) => {
          const bgColor =
            values.toLowerCase() === "female" ? "#ec4899" : "#3b82f6";

          return (
            <p
              style={{
                textTransform: "capitalize",
                padding: "0.25rem 0.75rem",
                display: "inline-block",
                borderRadius: "9999px",
                backgroundColor: bgColor,
                color: "white",
              }}
            >
              {values}
            </p>
          );
        },
      },
    },
    {
      name: "phone",
    },
    {
      name: "Action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <>
            <Link to={`/update/${data[tableMeta.rowIndex].id}`}>
              <Button
                sx={{
                  textTransform: "capitalize",
                  padding: "0.25rem 0.75rem",
                  display: "inline-block",
                  borderRadius: "9999px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#16a34a",
                  },
                }}
              >
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(data[tableMeta.rowIndex].id)}
              sx={{
                textTransform: "capitalize",
                marginLeft: "5px",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                backgroundColor: "#ef4444",
                color: "white",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#dc2626",
                },
              }}
            >
              Delete
            </Button>
          </>
        ),
      },
    },
  ];

  return (
    <div className="bg-slate-500 py-10 min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-6xl flex justify-end mb-4">
        <Link to="/create">
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-6xl">
        <ThemeProvider theme={MuiTheme()}>
          <MUIDataTable
            title={
              <div className="text-center text-2xl md:text-3xl  font-bold ml-60 block py-4 text-gray-800">
                List of Users
              </div>
            }
            data={data}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Home;
