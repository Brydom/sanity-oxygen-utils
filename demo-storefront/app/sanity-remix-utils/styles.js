import styled from 'styled-components';

export const DatasetSelectorContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 50;
  display: flex;
  align-items: stretch;
  border: 1px solid black;
  background-color: white;
  opacity: 20;

  &:hover {
    opacity: 100;
  }
`;

export const DatasetSelectorTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  padding: 0 1rem;
  color: white;
`;

export const DatasetSelectorDraftsButton = styled.button`
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-left: 1px solid black;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-family: inherit;
  appearance: none;
  background-color: white;
  cursor: pointer;
  border-radius: 0;
  border: 0;
`;

export const DatasetSelectorDatasetDropdown = styled.select`
  border: 0;
  border-left: 1px solid black;
  font-family: inherit;
  padding-left: 0.5rem;
  margin-right: 0.5rem;
`;
