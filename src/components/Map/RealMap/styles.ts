import styled from '@emotion/styled';

const Container = styled.div<any>`
  width: ${({ withMargin }) => (withMargin ? 'calc(100% - 20px)' : '100%')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '40vh')};
  min-height: ${({ minHeight }) => minHeight || '400px'};
  height: 100%;
  margin: ${({ withMargin }) => (withMargin ? '0px 10px' : '0')};

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  box-shadow: ${({ theme }) => theme.shadows.md};

  overflow: hidden;

  .leaflet-container {
    min-height: inherit;
    height: inherit;
  }

  .easy-button-button {
    padding: 0;
  }

  .leaflet-routing-container {
    display: none;
  }

  .leaflet-div-icon {
    background: none;
    border: none;
  }
`;

export { Container };
