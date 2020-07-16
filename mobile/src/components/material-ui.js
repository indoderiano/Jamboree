import React, {PureComponent, Component} from 'react'
import PropTypes from 'prop-types'
import {TextInput,StyleSheet,Text} from 'react-native'

import {
    TextField,
    OutlinedTextField,
    FilledTextField
  } from 'react-native-material-textfield'

import {stylesCall,dark} from '../supports/Styles'

export class MyTextField extends Component {


    // FOR COMPONENT WITH AUTOCOMPLETE FEAT
    // https://www.digitalocean.com/community/tutorials/react-react-autocomplete

    
    render () {
        return (
            <TextField 
                {...this.props}
                textColor='rgba(0,0,0,.75)'
                tintColor='orange'
                style={[{color:dark},stylesCall.ubuntu,this.props.style]}
                labelTextStyle={[stylesCall.ubuntu,this.props.labelTextStyle]}
                
            />
        )

    }
}


export class TextUbuntu extends Component {
    state = {  }
    render() { 
        // console.log('text ubuntu')
        // console.log(this.props.bold)
        const {bold,medium} = this.props
        return ( 
            <Text 
                {...this.props}

                style={[
                    this.props.style,
                    bold?styles.ubuntuBold:medium?styles.ubuntuMedium:styles.ubuntu
                ]}
            >
                {this.props.children}
            </Text>
         );
    }


}
 

const styles=StyleSheet.create({
    ubuntu: {
        fontFamily: 'Ubuntu-Light'
    },
    ubuntuMedium: {
        fontFamily: 'Ubuntu-Medium'
    },
    ubuntuBold: {
        fontFamily: 'Ubuntu-Bold'
    }
})