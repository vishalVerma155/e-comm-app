const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


// routers
const userRouter = require('./routes/web/user.routes.js');
const productRouter = require('./routes/product/product.routes.js');
const companyLogoRouter = require('./routes/companyLogo/companyLogo.routes.js');
const heroSectionRouter = require('./routes/homepage/heroSection/heroSection.routes.js');
const salesectionRouter = require('./routes/homepage/saleSection/saleSection.routes.js');
const brandsectionRouter =  require('./routes/homepage/brands/brandsSection.routes.js');
const featuredSectionRouter = require('./routes/homepage/featuredSection/featuredSection.routes.js');
const onSaleSectionRouter = require('./routes/homepage/onSaleSection/onSaleSection.routes.js');
const topRatedSectionRouter = require('./routes/homepage/topRatedSection/topRatedSection.routes.js');
const newLeagueSectionRouter = require('./routes/homepage/newLeagueSection/newLeagueSection.routes.js');
const newArrivalSectionRouter = require('./routes/homepage/newArrivalSection/newArrivalsection.routes.js');
const recentArrivalSectionRouter = require('./routes/homepage/recentArrivalSection/recentArrivalSecton.routes.js')
const wishListRouter = require('./routes/wishList/wishList.routes.js');
const cartRouter = require('./routes/cart/cart.routes.js');
const adminRouter = require('./routes/admin/web/admin.routes.js');
const colorsRouter = require('./routes/colors/colors.routes.js');
const reviewRouter = require('./routes/product/review.routes.js');


// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "*"}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// DB connection
const dbconnect = require('./config/db.js');

// routes 
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/companyLogo", companyLogoRouter);
app.use("/homePage/heroSection", heroSectionRouter);
app.use("/homePage/saleSection", salesectionRouter);
app.use("/homePage/brandSection", brandsectionRouter);
app.use("/homePage/featuredSection", featuredSectionRouter);
app.use("/homePage/onSaleSection", onSaleSectionRouter);
app.use("/homePage/topRatedSection", topRatedSectionRouter);
app.use('/homePage/newLeagueSection', newLeagueSectionRouter);
app.use('/homePage/newArrivalSection', newArrivalSectionRouter);
app.use('/homePage/recentArrivalSection', recentArrivalSectionRouter);
app.use("/wishList", wishListRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/colors", colorsRouter);
app.use("/product", reviewRouter);







// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    dbconnect();
});

// Default route
app.get('/', (req, res) => {
    res.send("Default Route");
});