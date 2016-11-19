import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadGallica } from '../actions/gallica'
import { LOADING, LOADED, FAILED } from '../constants'

const loadIfNeeded = props => {
  const { 
    url,
    gallica
  } = props
  if (!gallica) props.loadGallica(url)   
}

class GallicaDetails extends Component {
  
  componentWillMount(props) {
    loadIfNeeded(this.props)
  }
  
  // componentWillReceiveProps(nextProps) {
  //   loadIfNeeded(props)
  // }
    
  render() {
    const { 
      url,
      gallica
    } = this.props
    if (!gallica || gallica.status === LOADING) return <span>loading gallica</span>
    if (gallica.status === FAILED) return <span>error while loading gallica</span>
    const { metaInfo } = gallica
    const thumbnail = metaInfo['og:image'] 
    return (
      <div>
        { thumbnail && <img src={thumbnail} />}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  gallica: state.gallica[ownProps.url]
})

const mapDispatchToProps = {
  loadGallica
}

GallicaDetails.propTypes = {
  url: PropTypes.string.isRequired,
  gallica: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(GallicaDetails)