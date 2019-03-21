import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
    P, Button, Link, ButtonPin, InputPin,
} from 'trezor-ui-components';

import { PIN_MANUAL_URL } from 'config/urls';

const Wrapper = styled.div`
    max-width: 260px;
    margin-left: auto;
    margin-right: auto;
`;

const InputWrapper = styled.div`
    margin-top: 24px;
    max-width: 260px;
`;

const PinRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const PinFooter = styled.div`
    margin: 20px 0 10px 0;
    display: flex;
    flex-direction: column;
`;

class PinMatrix extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pin: '',
        };
    }

    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
    }

    onPinAdd = (input) => {
        let { pin } = this.state;
        if (pin.length < 9) {
            pin += input;
            this.setState({
                pin,
            });
        }
    }

    onPinBackspace = () => {
        this.setState(previousState => ({
            pin: previousState.pin.substring(0, previousState.pin.length - 1),
        }));
    }

    keyboardHandler(event) {
        const { onPinSubmit } = this.props;
        const { pin } = this.state;

        event.preventDefault();
        switch (event.keyCode) {
            case 13:
                // enter,
                onPinSubmit(pin);
                break;
            // backspace
            case 8:
                this.onPinBackspace();
                break;

            // numeric and numpad
            case 49:
            case 97:
                this.onPinAdd(1);
                break;
            case 50:
            case 98:
                this.onPinAdd(2);
                break;
            case 51:
            case 99:
                this.onPinAdd(3);
                break;
            case 52:
            case 100:
                this.onPinAdd(4);
                break;
            case 53:
            case 101:
                this.onPinAdd(5);
                break;
            case 54:
            case 102:
                this.onPinAdd(6);
                break;
            case 55:
            case 103:
                this.onPinAdd(7);
                break;
            case 56:
            case 104:
                this.onPinAdd(8);
                break;
            case 57:
            case 105:
                this.onPinAdd(9);
                break;
            default: break;
        }
    }

    // keyboardHandler (event) => {};

    render() {
        const { onPinSubmit } = this.props;
        const { pin } = this.state;

        return (
            <Wrapper>
                <InputWrapper>
                    <InputPin value={pin} onDeleteClick={() => this.onPinBackspace()} />
                </InputWrapper>
                <PinRow>
                    <ButtonPin type="button" data-value="7" onClick={() => this.onPinAdd(7)}>&#8226; </ButtonPin>
                    <ButtonPin type="button" data-value="8" onClick={() => this.onPinAdd(8)}>&#8226;</ButtonPin>
                    <ButtonPin type="button" data-value="9" onClick={() => this.onPinAdd(9)}>&#8226;</ButtonPin>
                </PinRow>
                <PinRow>
                    <ButtonPin type="button" data-value="4" onClick={() => this.onPinAdd(4)}>&#8226; </ButtonPin>
                    <ButtonPin type="button" data-value="5" onClick={() => this.onPinAdd(5)}>&#8226;</ButtonPin>
                    <ButtonPin type="button" data-value="6" onClick={() => this.onPinAdd(6)}>&#8226;</ButtonPin>
                </PinRow>
                <PinRow>
                    <ButtonPin type="button" data-value="1" onClick={() => this.onPinAdd(1)}>&#8226; </ButtonPin>
                    <ButtonPin type="button" data-value="2" onClick={() => this.onPinAdd(2)}>&#8226;</ButtonPin>
                    <ButtonPin type="button" data-value="3" onClick={() => this.onPinAdd(3)}>&#8226;</ButtonPin>
                </PinRow>

                <PinFooter>
                    <Button type="button" onClick={() => onPinSubmit(pin)}>
                        Enter PIN
                    </Button>
                    <P isSmaller>
                        Not sure how PIN works? <Link isGreen href={PIN_MANUAL_URL}>Learn more</Link>
                    </P>
                </PinFooter>
            </Wrapper>
        );
    }
}

PinMatrix.propTypes = {
    onPinSubmit: PropTypes.func.isRequired,
};

export default PinMatrix;