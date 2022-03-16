/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

import React from 'react';
import cardBack from '../../Assets/card-back.png';

const CardEditor = () => (
  <div className="card-editor w-full h-screen flex items-center justify-center">
    <form className="bg-red-200 w-1/2 flex flex-row p-5">
      <img className="w-3/12" src={cardBack} alt="card" />
      <ul className="flex flex-col flex-wrap max-h-72 gap-3 pl-5">
        <li>
          <label htmlFor="card-name">
            Card Name:
            <input type="text" id="card-name" name="card-name" />
          </label>
        </li>
        <li>
          <label htmlFor="card-owned">
            Owned?:
            <input type="checkbox" id="card-owned" name="card-owned" />
          </label>
        </li>
        <li>
          <label htmlFor="card-amount-copies">
            Owned Copies:
            <input
              type="number"
              id="card-amount-copies"
              name="card-amount-copies"
            />
          </label>
        </li>
        <li>
          <label htmlFor="card-available-copies">
            Available for Use:
            <input
              type="number"
              id="card-available-copies"
              name="card-available-copies"
            />
          </label>
        </li>
        <li>
          <label htmlFor="card-box-location">
            Box Location:
            <input
              type="text"
              id="card-box-location"
              name="card-box-location"
            />
          </label>
        </li>
        <li>
          <label htmlFor="card-binder-location">
            Binder Location:
            <input
              type="text"
              id="card-binder-location"
              name="card-binder-location"
            />
          </label>
        </li>
      </ul>
    </form>
  </div>
);

export default CardEditor;
