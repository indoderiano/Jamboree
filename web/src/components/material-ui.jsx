import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl } from '@material-ui/core';





export const MyTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'rgba(0,0,0,.4)',
        // fontWeight: '700',
        // letterSpacing: '2px'
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'orange',
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'rgba(0,0,0,.4)'
      },
      '& .MuiOutlinedInput-root': {
        // '& fieldset': {
        //   borderColor: 'red',
        // },
        '&:hover fieldset': {
          borderColor: 'rgba(0,0,0,.4)',
          // borderColor: 'red',
          transition: 'all .2s ease'
        },
        '& input': {
            // fontSize: '9px'
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(0,0,0,.4)',
          borderWidth: '1px'
        },
        // legend border-top width
        '&.Mui-focused fieldset .PrivateNotchedOutline-legendLabelled-262': {
            fontSize: '10.5px'
        }
        // '& .MuiInputBase-input': {
        //   background: 'white'
        // }
      },
    //   label
      '& .MuiFormLabel-root': {
          fontSize: '14px'
      }
    },
  })(TextField);

  
export const MyFormControl = withStyles({
  root: {
    '&.Store-formControl-31': {
      margin: '0px',
    },
    '& label.Mui-focused': {
      color: 'rgba(0,0,0,.4)',
      // fontWeight: '700',
      // letterSpacing: '2px'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      // '& fieldset': {
      //   borderColor: 'red',
      // },
      '& .MuiOutlinedInput-input': {
        padding: '10.5px 14px'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0,0,0,.4)',
        transition: 'all .2s ease'
      },
      '& input': {
          // fontSize: '9px'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(0,0,0,.4)',
        borderWidth: '1px'
      },
      // legend border-top width
      '&.Mui-focused fieldset .PrivateNotchedOutline-legendLabelled-262': {
          fontSize: '10.5px'
      }
      // '& .MuiInputBase-input': {
      //   background: 'white'
      // }
    },
    //   label
    '& .MuiFormLabel-root': {
        fontSize: '14px'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    }
  },
})(FormControl);


export const MyButton = withStyles({
  root: {
    color: 'rgba(0,0,0,.5)',
    transition: 'all .1s ease'
  }
})(Button);