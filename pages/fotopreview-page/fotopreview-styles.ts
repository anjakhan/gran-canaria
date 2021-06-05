import { css, CSSResultGroup } from 'lit';

export const fotoPreviewStyles: CSSResultGroup = css`
  .welcome-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
  }

  .foto-calendar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: var(--fuerte-box-shadow);
    border-radius: 10px;
    margin-top: 20px;
    width: 640px;
    padding-bottom: 20px;
    background-color: #fff7e6;
  }

  .calendar-month {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    padding: 30px 50px 10px;
    text-align: center;
  }

  .calendar-month wc-icon {
    width: 30px;
    height: 30px;
  }

  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .calendar-day {
    font-weight: bold;
    padding: 20px 35px;
    color: var(--fuerte-aqua);
  }

  .month {
    display: grid;
    grid-template-columns: repeat(7, 90px);
    grid-template-rows: repeat(5, 50px);
    justify-content: center;
  }

  .date-box {
    display: flex;
    font-weight: bold;
    color: #555;
    text-align: center;
    cursor: pointer;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 50px;
  }

  .date-text {
    text-align: center;
    min-width: 20px;
    min-height: 20px;
  }

  .date-box:hover .date-text {
    background-color: var(--fuerte-brown);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }

  .today {
    background-color: var(--fuerte-aqua);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }
  
  .date-box:hover .today {
    background-color: var(--fuerte-aqua);
  }

  .disabled {
    cursor: default;
  }

  .back-to-calendar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hidden {
    display: none;
  }
`;
