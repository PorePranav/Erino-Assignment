import { Request, Response, NextFunction } from 'express';

import Contact, { IContact } from '../models/contactModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import {
  createContactSchema,
  updateContactSchema,
} from '../validators/contactValidations';

export const createContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const zodResult = createContactSchema.safeParse(req.body);

    if (!zodResult.success) {
      const errors = zodResult.error.errors.map((err) => err.message);
      return next(new AppError(errors.join(', '), 400));
    }

    const newContactData = { ...zodResult.data, userId: req.user!._id };
    const newContact = await Contact.create(newContactData);

    res.status(201).json({
      status: 'success',
      data: newContact,
    });
  }
);

export const getContacts = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const contacts = await Contact.find({ userId: req.user!._id });

    res.status(200).json({
      status: 'success',
      count: contacts.length,
      data: contacts,
    });
  }
);

export const updateContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const zodResult = updateContactSchema.safeParse(req.body);

    if (!zodResult.success) {
      const errors = zodResult.error.errors.map((err) => err.message);
      return next(new AppError(errors.join(', '), 400));
    }

    const fetchedContact = await Contact.findById(req.params.id);
    if (!fetchedContact) return next(new AppError('Contact not found', 404));

    if (fetchedContact.userId?.toString() !== req.user!._id.toString())
      return next(
        new AppError('You are unauthorized to perform this action', 401)
      );

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      zodResult.data,
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedContact,
    });
  }
);

export const deleteContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const fetchedContact = await Contact.findById(req.params.id);
    if (!fetchedContact) return next(new AppError('Contact not found', 404));

    if (fetchedContact.userId?.toString() !== req.user!._id.toString())
      return next(
        new AppError('You are unauthorized to perform this action', 401)
      );

    await Contact.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
