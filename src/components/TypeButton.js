import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { 
    AudioPlayer, 
} from 'react-native-audio-player-recorder'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default class TypeButton extends Component {
    constructor(props) {
        super(props);
    }

    _onSelect = () => {
        this.props.onSelect(this.props.title);
    }

    render() {     
        let formattedName = this.props.title.toLowerCase();   
        console.log(formattedName);
        console.log(this.props.selectedType);
        return (
            <TouchableOpacity onPress={this._onSelect} style={styles.typeButtonWrapper}>
                <LinearGradient colors={this.props.color} style={[styles.typeButton, formattedName == this.props.selectedType && styles.isSelected]}>
                    <Icon name={this.props.icon} size={30} color="#fff" />
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    typeButtonWrapper: {
        width: '49%'
    },
    typeButton: {
        alignItems: 'center',
        borderRadius: 7,
        height: 75,
        justifyContent: 'center',
        shadowColor: '#222222',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    isSelected: {
        borderColor: '#cecece',
        borderWidth: 3,
        overflow: 'hidden'
    }
});