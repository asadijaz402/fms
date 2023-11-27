import React from 'react';
import ServiceDialog from '../fleet/servicing/Dialogs/ServiceDialog';
import TyresBookingDialog from '../fleet/servicing/tyres/Components/Dialogs/TyresBookingDialog';
import BrakesBookingDialog from '../fleet/servicing/brakes/Components/Dialogs/BrakesBookingDialog';
import BookMOTDialog from '../fleet/Gov/MOT/Dialogs/BookMOTDialog';
import TaxUpdate from '../fleet/Gov/Tax/Dialogs/TaxUpdate';

export default function Dialogs({ event = false, open, handleClose }) {
  const list_dialogs = [
    // {
    //   category: "Booking",
    //   comp: (
    //   )
    // },
    {
      category: 'Service',
      comp: (
        <ServiceDialog
          rowId={event && parseInt(event.publicId)}
          calendar
          modalOpen={open}
          handleCloseModal={handleClose}
        />
      ),
    },
    {
      category: 'Tyres',
      comp: (
        <TyresBookingDialog
          rowId={event && parseInt(event.publicId)}
          calendar
          modalOpen={open}
          handleCloseModal={handleClose}
        />
      ),
    },
    {
      category: 'Brakes',
      comp: (
        <BrakesBookingDialog
          rowId={event && parseInt(event.publicId)}
          calendar
          modalOpen={open}
          handleCloseModal={handleClose}
        />
      ),
    },
    {
      category: 'MOT',
      comp: (
        <BookMOTDialog
          rowId={event && parseInt(event.publicId)}
          calendar
          modalOpen={open}
          handleCloseModal={handleClose}
        />
      ),
    },
    {
      category: 'Tax',
      comp: (
        <TaxUpdate
          rowId={event && parseInt(event.publicId)}
          calendar
          modelOpen={open}
          handleCloseModal={handleClose}
        />
      ),
    },
  ];

  if (open && event && Object.keys(event).length !== 0) {
    return list_dialogs.filter(
      (row) => row.category === event.extendedProps.category
    )[0].comp;
  } else {
    return null;
  }
}
