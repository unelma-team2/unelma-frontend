"use client";

import { Box, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";

const CONTACT_NAME = "Unelma Team";
const CONTACT_URL = "https://unelmamail.com";

export default function NewsletterTest() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?hl=en";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // Fetch the CSRF token from the backend
    fetch("https://core.unelmamail.com/api/correct-endpoint")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCsrfToken(data.token))
      .catch((error) => console.error("Error fetching CSRF token:", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#eaf7fa",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}
        >
          Sign up for email updates!
        </Typography>

        <form
          action="https://core.unelmamail.com/lists/691d96ff827d9/691d89899267f/sign-up"
          method="POST"
          className="form-validate-jqueryz"
        >
          <input
            type="hidden"
            name="_token"
            value=""
            autoComplete="off"
          />

          <div className="page-container login-container" style={{ minHeight: "249px" }}>
            <div className="page-content">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-sm-2 col-md-3"></div>
                  <div className="col-sm-8 col-md-6">
                    <h2 className="text-semibold mt-40 text-white">Team2</h2>
                    <div className="panel panel-body">
                      <h4>Welcome to {CONTACT_NAME}</h4>
                      <hr />
                      <div className="form-group control-text">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          id="EMAIL"
                          placeholder=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          name="EMAIL"
                          className="form-control required email:rfc,filter"
                        />
                      </div>
                      <div className="form-group control-text">
                        <label>First name</label>
                        <input
                          id="FIRST_NAME"
                          placeholder=""
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          name="FIRST_NAME"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group control-text">
                        <label>Last name</label>
                        <input
                          id="LAST_NAME"
                          placeholder=""
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          name="LAST_NAME"
                          className="form-control"
                        />
                      </div>
                      <div
                        className="d-flex align-items-top mb-4 mt-4 pt-2"
                        style={{ position: "relative" }}
                      >
                        <div className="mr-2">
                          <input type="checkbox" name="acm_term" required />
                        </div>
                        <div>
                          By checking this box, I acknowledge that I have read and understood the
                          <a href="" target="_blank">
                            Terms and Conditions
                          </a>{" "}
                          governing this subscription service and agree to be bound by them.
                        </div>
                      </div>
                      <div>
                        <div className="recaptcha-box">
                          <div
                            className="g-recaptcha"
                            data-sitekey="6LfyISoTAAAAABJV8zycUZNLgd0sj-sBFjctzXKw"
                          ></div>
                        </div>
                      </div>
                      <br />
                      <button className="btn btn-info bg-teal-800" type="submit">
                        Subscribe <span className="material-symbols-rounded">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer text-white">
              <span className="text-white">{CONTACT_NAME}</span>,{" "}
              <a href={CONTACT_URL} className="text-white" target="_blank">
                {CONTACT_URL}
              </a>
            </div>
          </div>
        </form>
      </Paper>
    </Box>
  );
}