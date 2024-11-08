import styled from "styled-components";

export const ScanWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  gap: var(--padding);
  overflow-y: auto;
`;

export const BaseDiv = styled.div`
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
  padding: var(--padding);
`;

export const TargetsDiv = styled(BaseDiv)``;
export const SubdomainsDiv = styled(BaseDiv)`
  overflow-y: auto;
`;

export const TargetBody = styled.div`
  width: 100%;
  display: flex;
`;
export const TargetWrapper = styled(BaseDiv)`
  display: flex;
  flex-direction: column;
  .icon-scan {
    margin-right: 5px;
  }
`;
export const Input = styled.input`
  width: 100%;
  border: 1px solid var(--border-color);
`;
