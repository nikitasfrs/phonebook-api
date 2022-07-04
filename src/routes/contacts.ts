import express from 'express';
import {
  getMultiple,
  deleteContact,
  updateContact,
  createContact,
} from '../services/contacts';

const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.json(getMultiple(req.query));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    res.json(updateContact(parseInt(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    res.json(createContact(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json(deleteContact(parseInt(req.params.id)));
  } catch (err) {
    next(err);
  }
});

export default router;
