import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    lastConvertedDate: PropTypes.object,
    handleTextChange: PropTypes.func,
    handleSwapCurrency: PropTypes.func,
    isFetching: PropTypes.bool,
  };

  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  };
  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  };
  handleOptionsPress = () => {
    this.props.navigation.navigate('Options', { title: 'Options' });
  };
  render() {
    const {
      baseCurrency,
      quoteCurrency,
      amount,
      lastConvertedDate,
      conversionRate,
      handleTextChange,
      handleSwapCurrency,
    } = this.props;
    let quotePrice = (amount * conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...';
    }
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={amount.toString()}
            keyboardType="numeric"
            onChangeText={value => handleTextChange(value)}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            value={quotePrice}
          />
          <LastConverted
            base={baseCurrency}
            quote={quoteCurrency}
            date={lastConvertedDate}
            conversionRate={conversionRate}
          />
          <ClearButton text="Reverse Currencies" onPress={handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (store) => {
  const { baseCurrency, quoteCurrency, amount } = store.currencies;

  const conversionSelector = store.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const { isFetching } = conversionSelector;

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    conversionRate: rates[quoteCurrency] || 0,
    isFetching,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleTextChange: (amount) => {
    dispatch(changeCurrencyAmount(amount));
  },
  handleSwapCurrency: () => {
    dispatch(swapCurrency());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
