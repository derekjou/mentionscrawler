import React from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Grid,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Navbar: {
    backgroundColor: theme.appBlue,
    height: "92px"
  },
  title: {
    marginLeft: "1%",
    width: "20%",
    overflow: "visible",
    fontWeight: 900,
    letterSpacing: "0.5px"
  },
  loginTitle: {
    width: "160px",
    overflow: "visible",
    flexGrow: 1
  },
  titlePart: {
    color: "#273f96"
  },
  loginRegisterButton: {
    border: "1px solid white",
    borderRadius: "20px",
    color: "white",
    width: "125px",
    height: "50%",
    marginLeft: "10px",
    fontSize: "12px"
  },
  linkTitle: {
    color: "white",
    marginRight: "15px"
  },
  search: {
    width: "48vw",
    height: "50px",
    borderRadius: "50px",
    paddingLeft: "10px",
    paddingTop: "5px",
    margin: "auto",
    fontWeight: 900
  },
  input: {
    width: "calc(100% - 58px - 140px - 140px)",
    marginLeft: "10px"
  },
  select: {
    marginRight: "5px",
    width: "135px",
    maxWidth: "135px"
  }
}));

const Navbar = ({
  showSearch = false,
  showRegister = false,
  loggedIn = false,
  loginToggle = false,
  searchInput = "",
  onSearchChange = () => {},
  companies = [],
  platforms = {},
  isCompanyOpen = false,
  handleCompanyClose = () => {},
  handleCompanyOpen = () => {},
  handleCompanyChange = () => {},
  selectedCompanies = [],
  isPlatformOpen = false,
  handlePlatformClose = () => {},
  handlePlatformOpen = () => {},
  handlePlatformChange = () => {},
  selectedPlatforms = [],
  handleSubmit = () => {}
}) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <AppBar position="static" className={classes.Navbar}>
        <Toolbar>
          {showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.title}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
              <Paper
                component="form"
                className={classes.search}
                onSubmit={handleSubmit}
              >
                <InputBase
                  placeholder="Search Contents..."
                  className={classes.input}
                  value={searchInput}
                  onChange={onSearchChange}
                  id="searchfield"
                  name="searchfield"
                />
                <Select
                  multiple
                  className={classes.select}
                  open={isCompanyOpen}
                  onClose={handleCompanyClose}
                  onOpen={handleCompanyOpen}
                  renderValue={selected => selected.join(", ")}
                  value={selectedCompanies}
                  onChange={handleCompanyChange}
                  id="companyfield"
                  name="companyfield"
                >
                  {companies.map((company, i) => {
                    return (
                      <MenuItem value={company.name} key={i}>
                        <Checkbox
                          checked={selectedCompanies.indexOf(company.name) > -1}
                        />
                        <ListItemText primary={company.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
                <Select
                  multiple
                  className={classes.select}
                  open={isPlatformOpen}
                  onClose={handlePlatformClose}
                  onOpen={handlePlatformOpen}
                  renderValue={selected => selected.join(", ")}
                  value={selectedPlatforms}
                  onChange={handlePlatformChange}
                  id="platformfield"
                  name="platformfield"
                >
                  {Object.keys(platforms).map((platform, i) => {
                    return (
                      <MenuItem value={platform} key={i}>
                        <Checkbox
                          checked={selectedPlatforms.indexOf(platform) > -1}
                        />
                        <ListItemText primary={platform} />
                      </MenuItem>
                    );
                  })}
                </Select>
                <IconButton
                  type="submit"
                  aria-label="search"
                  onSubmit={handleSubmit}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
              <IconButton>
                <SettingsIcon onClick={() => history.push("/settings")} />
              </IconButton>
            </>
          )}
          {!showSearch && (
            <>
              <Typography variant="h6" noWrap className={classes.loginTitle}>
                mentions<span className={classes.titlePart}>crawler.</span>
              </Typography>
              <Typography className={classes.linkTitle}>
                {showRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>
              <Button
                variant="outlined"
                href={showRegister ? "/login" : "/register"}
                className={classes.loginRegisterButton}
              >
                <Typography variant="button">
                  {showRegister ? "Login" : "Sign Up"}
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
