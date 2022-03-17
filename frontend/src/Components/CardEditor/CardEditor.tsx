/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

import React from 'react';
import cardBack from '../../Assets/card-back.png';

const CardEditor = () => {
  const cardEditorSubmit = () => {};

  return (
    <div className="card-editor w-full h-screen flex items-center justify-center">
      <form className="bg-gradient-to-r from-gray-700 to-gray-900 rounded w-1/2 flex flex-row p-5 text-white">
        <img className="w-3/12" src={cardBack} alt="card" />
        <ul className="max-h-72 grid grid-cols-2 gap-4 pl-5">
          <li>
            <label htmlFor="card-name">
              Card Name:
              <input
                type="text"
                id="card-name"
                name="card-name"
                className="border-2 border-gray-400 rounded outline-none focus:border-blue-400"
              />
            </label>
          </li>
          <li>
            <label htmlFor="card-owned" className="flex flex-col">
              Owned?:
              <input
                type="checkbox"
                id="card-owned"
                name="card-owned"
                className="border-2 border-gray-400 rounded outline-none w-7 h-7"
              />
            </label>
          </li>
          <li>
            <label htmlFor="card-amount-copies">
              Owned Copies:
              <input
                type="number"
                id="card-amount-copies"
                name="card-amount-copies"
                className="border-2 border-gray-400 rounded outline-none focus:border-blue-400"
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
                className="border-2 border-gray-400 rounded outline-none focus:border-blue-400"
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
                className="border-2 border-gray-400 rounded outline-none focus:border-blue-400"
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
                className="border-2 border-gray-400 rounded outline-none focus:border-blue-400"
              />
            </label>
          </li>
        </ul>
        <button
          className="card-editor-button p-4 bg-gradient-to-b from-blue-500 to-indigo-500 hover:from-blue-500 hover:to-green-400 rounded text-blue-900 hover:text-white"
          type="submit"
          onSubmit={cardEditorSubmit}
        >
          Submit Card
        </button>
      </form>
    </div>
  );
};

export default CardEditor;
