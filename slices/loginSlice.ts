import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoginSlice {
    value: number,
    loggedin: boolean,
}
 


export const loginSlice = createSlice({
  name: 'roleid',
  initialState: {
    value: 0,
    loggedin: false,
  },
  reducers: {
    logHimIn: state => {
    
      state.loggedin = true
    },
    logHimOut: state => {
      state.loggedin = false
    },
    setRole: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { logHimIn, logHimOut, setRole } = loginSlice.actions

export default loginSlice.reducer