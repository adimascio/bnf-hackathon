import React, { PropTypes, Component } from 'react'
import { connectFromRoute } from '../routes'
import { loadTEI } from '../actions/tei'
import { connect } from 'react-redux'
import Authors from './authors'
import { LOADING, LOADED, FAILED } from '../constants'

const loadIfNeeded = props => {
  const { corpusId, TEIFile } = props
  if (!TEIFile) props.loadTEI(corpusId)
}

class Visualisation_ extends Component {
  
  componentWillMount() {
    loadIfNeeded(this.props)
  }
  
  render() {
    const { corpusId, TEIFile } = this.props
    console.log('TEIFile: ', TEIFile)
    if (!TEIFile || TEIFile.status !== LOADED ) return <span>loading</span>
    const { data } = TEIFile
    return <Authors authors={data.people} />
  }
}

Visualisation_.propTypes = {
  corpusId: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  TEIFile: state.tei[ownProps.corpusId]
})

const mapDispatchToProps = {
  loadTEI
}

const Visualisation = connect(mapStateToProps, mapDispatchToProps)(Visualisation_)

export default connectFromRoute(Visualisation)