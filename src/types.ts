export type ReduxState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: string[]
    expenses: [{
      id: number,
      value: number,
      currency: string,
      method: string,
      tag: string,
      description: string,
      exchangeRates: string,
    }],
    editor: boolean,
    idToEdit: number,
  }
};
