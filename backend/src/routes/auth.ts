import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import Users from "../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth";

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password minimum 6 characters").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        const isMatch = await bcryptjs.compare(password, user?.password);
        if (!isMatch) {
          res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY as string,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ userId: user._id });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
