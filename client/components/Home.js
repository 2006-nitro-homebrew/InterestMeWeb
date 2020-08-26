import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="welcome-all">
      <div className="welcome-wrap">
        <div className="welcome-text">
          <h1>Welcome to InterestMe</h1>
        </div>
        <div className="welcome-message">
          <h4>The best way to browse and save your favorite articles</h4>
        </div>
      </div>

      <div>
        <Link to="/login" style={{ textDecoration: "none", color: "#FFF" }}>
          <Button
            className="welcome-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Link>
        <div class="divider" />
        <Link to="/signup" style={{ textDecoration: "none", color: "#FFF" }}>
          <Button
            className="welcome-button"
            variant="contained"
            color="primary"
          >
            Signup
          </Button>
        </Link>
      </div>

      <div className='welcome-description-container'>
        <div className='welcome-description'>
          <p>Use the Browser Extension to save your article.</p>
        </div>

        <div className='welcome-description'>
          <p>View your favorite articles even if you are offline!</p>
        </div>

        <div className='welcome-description'>
          <p>Enjoy countless recommendations based on your saved articles.</p>
        </div>
      </div>

    </div>
  );
}

export default Home;
