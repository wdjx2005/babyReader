import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class ErrorMessage extends Component {
    render() {     
        const show = this.props.show;
        return (
            <View style={styles.errorMessage}>
                <Text style={styles.errorMessageText}>{this.props.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorMessage: {
        backgroundColor: '#f44336',
        borderRadius: 4,
        padding: 10,
        marginVertical: 10
    },
    errorMessageText: {
        color: '#FFFFFF'
    }
});