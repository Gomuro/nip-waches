import { CardMedia, Grid, Typography } from "@material-ui/core";
import React from "react";

const About = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "5%" }}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom>
            About me
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <image src="../../assets//img/pic.png" alt="Pic" />
          <Typography variant="h4" gutterBottom>
            Hi! Recently I finished “JavaScript Fundamentals” course at
            SoftServe IT Academy at Lviv and now I’m looking for an opportunity
            to work as a trainee frontend developer (but in the future I’d like
            to become a full-stack😀).I love programming, learning and problem
            solving. I am passionated about taking risks and solving them by
            communicating & sharing experience, eager to work with skilled
            professionals!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
