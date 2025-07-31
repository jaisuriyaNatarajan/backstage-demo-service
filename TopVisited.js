
import React from 'react';
import { Card, SectionTitle, TopVisitedList, VisitItem } from './styles';
import { FaFire } from 'react-icons/fa';

export const TopVisited = () => {
  return (
    <Card>
      <SectionTitle><FaFire color="#ff6b57" /> Top Visited</SectionTitle>
      <img src="https://img.icons8.com/fluency-systems-filled/48/folder-invoices.png" alt="folder" style={{ width: 72, margin: '16px 0' }} />
      <TopVisitedList>
        <VisitItem>infybackstage</VisitItem>
        <VisitItem>ui-document</VisitItem>
        <VisitItem>openfga</VisitItem>
        <VisitItem>opentga</VisitItem>
      </TopVisitedList>
    </Card>
  );
};
