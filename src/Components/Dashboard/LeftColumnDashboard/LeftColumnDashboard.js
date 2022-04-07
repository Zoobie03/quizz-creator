// Library
import React from 'react';
// Own Files
import styles from './LeftColumnDashboard.module.css';
// Components
import NumberOfQuizz from './NumberOfQuizz/NumberOfQuizz';
import SearchBar from './SearchBar/SearchBar';
import ThematicsAndTags from './ThematicsAndTags/ThematicsAndTags';
import UserPicture from './UserPicture/UserPicture';

const LeftColumnDashboard = (props) => {
  return (
    <div className={styles.LeftColumnDashboard}>
      <UserPicture />
      <NumberOfQuizz numberOfQuizz={props.numberOfQuizz} />
      <ThematicsAndTags title='Thématiques' noneMessage="Vous n'avez aucunes thématiques" />
      <ThematicsAndTags title='Tags' noneMessage="Vous n'avez aucun tag" />
      <SearchBar />
    </div>
  );
};

export default LeftColumnDashboard;
