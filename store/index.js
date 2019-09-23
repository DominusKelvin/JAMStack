/* eslint-disable no-console */
export const state = () => ({
  loggedIn: false,
  isLoading: false,
  dAppAddress: '3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2',
  acceptedAssets: [
    {
      name: 'Waves ',
      id: 'WAVES'
    },
    {
      name: 'Auct Token',
      id: '53VHGAEfVNJnByeMbu9r4DsxXoBz3TecQfWpYXAsZmzh'
    },
    {
      name: 'wBTC',
      id: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS'
    },
    {
      name: 'wUSD',
      id: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck'
    },
    {
      name: 'wEUR',
      id: 'Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU'
    }
  ],
  wavesNode: {
    test: 'https://nodes-testnet.wavesnodes.com'
  },
  jobs: []
})

export const mutations = {
  UPDATE_LOGGED_IN_STATUS(state) {
    state.loggedIn = true
  },
  LOAD_JOBS(state, data) {
    state.jobs = data
  }
}

export const actions = {
  loadJobs(context) {
    return this.$axios
      .$get(
        `https://nodes-testnet.wavesnodes.com/addresses/data/3N2EM5HFgf6UMBnvcJX3Cegmozwdv1iDeq2?matches=.*?_AuctionInfo$`
      )
      .then((data) => {
        const jobs = data
        const preparedJobs = jobs.map((job) => {
          return {
            info: JSON.parse(job.value),
            key: job.key
          }
        })
        context.commit('LOAD_JOBS', preparedJobs)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
