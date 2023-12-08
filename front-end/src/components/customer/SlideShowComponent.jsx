import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchBlogAvailable } from '../../slices/blogSlice';
import { useNavigate } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/20/1200x375-vivo-201123.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/07/tai-nghe-moi-01.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/25/web-90.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/23/1200x375-tcl-231123.png',
  },
];

function SlideShowComponent() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogAvailable())
  }, [dispatch])

  const blogs = useSelector((state) => state.blog.blogs);

  return (<>
    <Grid container spacing={2}>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "white" }}
          style={{ paddingLeft: 0 }}
        >
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper> */}
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {/* {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: '100%',
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                  borderRadius: 3
                }}
                src={step.imgPath}
                // alt={step.label}
              />
            ) : null}
          </div>
        ))} */}
        {blogs.map((blog, index) => (
          <div key={blog.blogId}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: '100%',
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                  borderRadius: 3,
                  cursor: "pointer"
                }}
                src={`http://localhost:9004/api/product/images/${blog.blogImage}`}
                onClick={()=>navigate(`/blog/${blog.blogId}`)}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Sau
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Trước
          </Button>
        }
      />
    </Box>

        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}>
        </Grid>
    </Grid>
    </>
  );
}

export default SlideShowComponent;
