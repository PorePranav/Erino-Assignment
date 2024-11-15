import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import AppError from '../utils/AppError';
import { loginSchema, signupSchema } from '../validators/authValidations';

type jwtPayload = {
  id: string;
};

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user._id);

  const cookieOptions: Record<string, any> = {
    expiresIn: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string) +
        86400000
    ),
    httpOnly: true,
    SameSite: 'none',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  const userObject = user.toObject();
  const { password, ...rest } = userObject;

  res.cookie('jwt', token, cookieOptions).status(statusCode).json({
    status: 'success',
    data: rest,
  });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.jwt;
    if (!token || token === 'null')
      return next(new AppError('User is not logged in', 401));

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as jwtPayload;

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) return next(new AppError('User does not exist', 401));

    req.user = freshUser;
    next();
  }
);

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const zodResult = signupSchema.safeParse(req.body);

    if (!zodResult.success) {
      const errors = zodResult.error.errors.map((err: Error) => err.message);
      return next(new AppError(errors.join(', '), 400));
    }

    const newUser = await User.create({
      name: zodResult.data.name,
      email: zodResult.data.email,
      password: zodResult.data.password,
      passwordConfirm: zodResult.data.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const zodResult = loginSchema.safeParse(req.body);

    if (!zodResult.success) {
      const errors = zodResult.error.errors.map((err: Error) => err.message);
      return next(new AppError(errors.join(', '), 400));
    }

    const { email, password } = zodResult.data;

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password entered', 401));
    }

    createSendToken(user, 200, res);
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.clearCookie('jwt').status(200).json({
      status: 'success',
      data: null,
    });
  }
);

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user!._id);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  }
);
