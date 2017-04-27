import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DeleteRecording extends Component {
    constructor(props) {
        super(props);
    }

    _onDelete = () => {
        this.props.onDeleteClick(true)
    }

    render() {        
        return (
            <TouchableOpacity style={styles.deleteButtonWrap} onPress={this._onDelete}>
                <View style={styles.deleteButton}>
                    <Icon name="ios-close" size={25} color="#fff" style={styles.deleteIcons} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    deleteButtonWrap: {
        overflow: 'hidden',
        position: 'absolute',
        top: -5,
        right: -5,
    },
    deleteButton: {
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 30/2,
        overflow: 'hidden',
        height: 30,
        width: 30
    },
    deleteIcons: {
        backgroundColor: 'transparent'
    }
}