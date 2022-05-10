/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import NewCard from './NewCard';
import OwnedCard from './OwnedCard';

const EditorModal = (props: any) => {
  const { closeModal, editorType, cardId } = props;

  if (editorType !== 'ownedCard') {
    return <NewCard closeModal={closeModal} />;
  }
  return <OwnedCard closeModal={closeModal} cardId={cardId} />;
};

export default EditorModal;
