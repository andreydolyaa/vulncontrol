import styled from "styled-components";

export const ScanWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: var(--padding);
`;

export const BaseDiv = styled.div`
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--radius);
  padding: var(--padding);
`;

export const Targets = styled(BaseDiv)`
  height: 100%;
`;
export const Subdomains = styled(BaseDiv)`
  height: 100%;
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
