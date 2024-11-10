import styled from "styled-components";

export const BaseDiv = styled.div`
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
`;

export const ScanWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  gap: var(--padding);
  overflow-y: auto;
`;

export const ListDiv = styled(BaseDiv)`
  position: relative;
  overflow-y: auto;
`;
export const ListHeaderDiv = styled.div`
  position: sticky;
  top: 0;
  height: 60px;
  /* box-shadow: 1px 1px 80px 30px #151518; */
  padding: 20px var(--padding);
  border-bottom: 1px solid var(--border-color);
  background-color: #2e2e41;
  width: 100%;
  z-index: 1;
  display: flex;
`;
export const ListBodyDiv = styled.div``;

export const TargetBody = styled.div`
  width: 100%;
  display: flex;
`;
export const TargetWrapper = styled(BaseDiv)`
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  .icon-scan {
    margin-right: 5px;
  }
`;
export const Input = styled.input`
  width: 100%;
  border: 1px solid var(--border-color);
  &::placeholder {
    color: var(--placeholder-color);
  }
`;
