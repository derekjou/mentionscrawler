import React, { useState } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    backgroundColor: "#fafbff",
    height: "100vh",
    padding: "5vh"
  },
  companyContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  companyTitle: {
    fontSize: "20px"
  },
  userEmailInput: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5vh"
  },
  emailTitle: {
    marginleft: "1vh",
    fontSize: "20px"
  },
  companyNameInput: {
    border: "none",
    width: "600px",
    outline: "none",
    height: "25px"
  },
  companyNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2vh",
    width: "600px"
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    width: "70px",
    height: "30px"
  },
  companyInputForm: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: "10px",
    width: "600px",
    alignItems: "center",
    marginLeft: "258px"
  },
  listOfCompanies: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: " 10px ",
    width: "600px",
    marginLeft: "258px",
    alignItems: "center"
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  },
  listOfInputs: {
    display: "flex",
    flexDirection: "column"
  },
  companyEmailInput: {
    width: "600px",
    outline: "none",
    backgroundColor: "white",
    height: "25px",
    border: "1px solid #eeeeef",
    borderRadius: "25px",
    alignItems: "center",
    padding: "10px"
  },
  saveButton: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    fontSize: "15px",
    marginLeft: "5vh",
    width: "90px",
    height: "35px"
  }
}));

const CompanyNameTextfield = ({
  defaultCompanyName,
  setCompanyNames,
  companyNames,
  enqueueSnackbar,
  setCompanyNameError,
  setCompanyNameSaveError
}) => {
  const classes = useStyles();

  const [companyNameInput, setCompanyNameInput] = useState(defaultCompanyName);
  const [isEdit, setIsEdit] = useState(false);

  const onRemoveHandler = (name, event) => {
    event.preventDefault();
    axios
      .delete(`/settings/${localStorage.getItem("email")}/company/${name}`)
      .then(() => {
        enqueueSnackbar("Company has been removed", { variant: "success" });
        setCompanyNames(companyNames.filter(item => item !== name));
      })
      .catch(() =>
        enqueueSnackbar("Company was not removed", { variant: "error" })
      );
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };

  const onChangeHandler = event => {
    event.preventDefault();
    if (!isEdit) setIsEdit(true);

    setCompanyNameInput(event.target.value);
  };

  const onEditHandler = () => {
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };

  const onSubmitHandler = event => {
    event.preventDefault();

    event.persist();
    if (companyNames.includes(event.target.companyName.value)) {
      setCompanyNameError("Company name already exists");
    } else if (event.target.companyName.value === "") {
      setCompanyNameError("Company name cannot be blank");
    } else {
      axios
        .put(
          `/settings/${localStorage.getItem("email")}/company/${
            event.target.companyName.value
          }`
        )
        .then(() => {
          // setCompanyNames([...companyNames, event.target.companyName.value]);
          // setCompanyNames(
          //   companyNames.filter(item => item !== defaultCompanyName)
          // );
          setCompanyNameInput(event.target.companyName.value);
          setIsEdit(false);
          enqueueSnackbar("Company has been edited and added", {
            variant: "success"
          });
        })
        .catch(() =>
          enqueueSnackbar("Company was not edited and added", {
            variant: "error"
          })
        );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className={classes.companyInputForm}>
        <input
          type="text"
          id="companyName"
          value={companyNameInput}
          onChange={onChangeHandler}
          className={classes.companyNameInput}
        ></input>
        {isEdit ? (
          <button
            onClick={() => onEditHandler()}
            className={classes.buttonAdornment}
          >
            <b> SAVE</b>
          </button>
        ) : (
          <button
            onClick={event => onRemoveHandler(companyNameInput, event)}
            className={classes.buttonAdornment}
          >
            <b> REMOVE</b>
          </button>
        )}
      </form>
    </div>
  );
};

export default withSnackbar(CompanyNameTextfield);
