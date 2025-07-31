
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 40px;
  background: #f8fbff;
  font-family: 'Inter', sans-serif;
`;

export const WelcomeText = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 24px;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const SearchBar = styled.input`
  flex-grow: 1;
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  margin-right: 16px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #ff6b57;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const CardGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

export const Card = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e1e1e;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export const TopVisitedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;

export const VisitItem = styled.div`
  font-size: 15px;
  color: #333;
`;

export const ViewMore = styled.a`
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: #3478f6;
  text-decoration: underline;
  cursor: pointer;
`;

export const StarredEntitiesWrapper = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const EntityRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const EntityCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EntityAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ bg }) => bg || '#ccc'};
  border-radius: 50%;
  font-size: 14px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EntityDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EntityName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1e1e1e;
`;

export const EntityType = styled.div`
  font-size: 12px;
  color: #444;
  background: #eef2f7;
  border-radius: 8px;
  padding: 2px 8px;
  width: fit-content;
`;
