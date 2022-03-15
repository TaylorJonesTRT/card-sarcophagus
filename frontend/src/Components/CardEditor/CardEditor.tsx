/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

import React from 'react';
import cardBack from '../../Assets/card-back.png';

const CardEditor = () => (
  <div className="card-editor w-full h-screen flex items-center">
    <form>
      <ul className="flex flex-col flex-wrap">
        <li className="w-3/12">
          <img src={cardBack} alt="card" />
        </li>
        <li>
          <label htmlFor="card-name">
            Card Name:
            <input type="text" id="card-name" name="card-name" />
          </label>
        </li>
        <li>
          <label htmlFor="card-attribute">
            Card Attribute:
            <input type="text" id="card-attribute" name="card-attribute" />
          </label>
        </li>
        <li>
          <label htmlFor="card-type">
            Card Type:
            <input type="text" id="card-type" name="card-type" />
          </label>
        </li>
        <li>
          <label htmlFor="card-level">
            Card Level:
            <input type="text" id="card-level" name="card-level" />
          </label>
        </li>
        <li>
          <label htmlFor="card-attack">
            Card Attack:
            <input type="text" id="card-attack" name="card-attack" />
          </label>
        </li>
        <li>
          <label htmlFor="card-defense">
            Card Defense:
            <input type="text" id="card-defense" name="card-defense" />
          </label>
        </li>
        <li>
          <label htmlFor="card-description">
            Card Description:
            <input type="text" id="card-description" name="card-description" />
          </label>
        </li>
      </ul>
    </form>
  </div>
);

export default CardEditor;
