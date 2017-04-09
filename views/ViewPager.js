import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

let { height, width } = Dimensions.get('window');
const g_height = height;
const g_width = width;

export default class ViewPager extends Component {

  constructor (props) {
    super(props);
  
    this.state = {
      currentPage: 0,
      duration: 2000
    };
  }

  componentDidMount () {
    if (Platform.OS == 'ios') {
      this._startTimer();
    } else {
      this._startTimerForAndroid();
    }
  }

  componentWillUnMount () {
    if (Platform.OS == 'ios') {
      clearInterval(this.interval);
    } else {
      clearInterval(this.interval);
    }
  }

   /**
    * 开启定时器
    * @private
    */
  _startTimer() {

    let scrollView = this.refs.myScrollView;
    let imgCount = this.props.imageSources.length;

    this.interval = setInterval( () => {

      // 记录当前正在活动的图片
      let activePage = 0;
      if ( (this.state.currentPage + 1) >= imgCount) { //防止越界
        activePage = 0;
      } else {
        activePage = this.state.currentPage + 1;
      }

      this.setState({
        currentPage: activePage
      });

      // 让ScrollView动起来
      let offSetX = activePage * width;
      scrollView.scrollTo({x: offSetX, y: 0, animated: true});

    }, this.state.duration);

  }

  /**
   *
   */
  _renderAllImage () {

    let images = [];

    let imageSources = this.props.imageSources;

    for (let i in imageSources) {
      images.push(
        <TouchableWithoutFeedback onPress={() => {
          console.log(imageSources[i].title);
        }}
        >
          <Image
            key = {i}
            source = {{ uri: imageSources[i].icon }}
            style = {{
              width: g_width,
              height: 200,
              resizeMode: 'stretch'
            }}
            title = {imageSources[i].title}
          />
        </TouchableWithoutFeedback>
      )
    }

    return images;
  }

  _renderAllImageForAndroid () {
    let images = [];

    let imageSources = this.props.imageSources;

    for (let i in imageSources) {
      images.push(
        <View
          key = {i}
          style = {{
            borderWidth: 1
          }}
          collapsable = {false}
        >
          <TouchableWithoutFeedback onPress={() => {
            console.log(imageSources[i].title);
            console.log(imageSources[i].icon);
          }}
          >
            <Image
              key = {i}
              source = {{ uri: imageSources[i].icon }}
              style = {{
                width: g_width,
                height: 200,
                resizeMode: 'stretch'
              }}
            />
          </TouchableWithoutFeedback>
        </View>
      )
    }

    return images;
  }

  /**
   * 所有的圆点
   */
  _renderCircleIndicator () {
    let circles = [];

    let imageSources = this.props.imageSources;

    let style;

    for (let i in imageSources) {
        style = i == this.state.currentPage ? {color: 'gray'} : {color: 'white'};
        circles.push(
            <Text
              key = {i}
              style = {[{fontSize: 25}, style]}
            >
              •
            </Text>
        );
    }

    return circles;
  }

  /**
   * 开始拖拽时的回调
   * @private
   */
  _onScrollBeginDrag() {
    clearInterval(this.interval);
  }

  /**
   * 拖拽停止时的回调
   * @private
   */
  _onScrollEndDrag() {
    this._startTimer();
  }


   /**
    * 当一页滑动结束时调用
    * @param scrollView
    */
  _onAnimationEnd(scrollView) {

    // 计算一页滑动的偏移量
    let offSetX = scrollView.nativeEvent.contentOffset.x;
    
    // 算出当前为第几页
    let currentPage = Math.floor((offSetX / width));
    this.setState({
      currentPage: currentPage
    });

  }

  _startTimerForAndroid() {
    this.interval = setInterval( () => {

      let nextPage = this.state.currentPage + 1;

      if (nextPage >= this.props.imageSources.length) {
        nextPage = 0;
      }

      this.refs.myViewPagerAndroid.setPage(nextPage);

      this.setState({
        currentPage: nextPage
      });

    }, this.state.duration);
  }

  _onPageScroll (event) {

    console.log(event.nativeEvent.position);

  }

  _onPageSelected (event) {
    console.log('页面变化了');

    // 当页面改变就更新点的位置
    this.setState({
      currentPage: event.nativeEvent.position
    });
  }

  render () {

    return (
      <View>

      {
        (Platform.OS == 'ios')
        ?
        <View style={styles.container}>
          <ScrollView
            ref = 'myScrollView'
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled = {true}
            onMomentumScrollEnd = { (scrollView) => this._onAnimationEnd(scrollView) }
            onScrollBeginDrag = { this._onScrollBeginDrag.bind(this) }
            onScrollEndDrag = { this._onScrollEndDrag.bind(this) }
          >
            {this._renderAllImage()}
          </ScrollView>

          <View style={styles.circleContainer}>
            {this._renderCircleIndicator()}
          </View>
        </View>
        :
        (Platform.OS == 'android')
        ?
        <View>
          <ViewPagerAndroid
            initialPage = {0}
            onPageScroll = { this._onPageScroll.bind(this) }
            onPageSelected = { this._onPageSelected.bind(this) }
            ref = 'myViewPagerAndroid'
            style = {{
              width: g_width,
              height: g_height*0.2,
              borderWidth: 1
            }}
          >
            {this._renderAllImageForAndroid()}
          </ViewPagerAndroid>

          <View style={styles.circleContainer}>
            {this._renderCircleIndicator()}
          </View>
        </View>
        :
        null
      }

      </View>
    );

  }
}

const styles = StyleSheet.create({

  container: {
    marginTop: 25
  },

  circleContainer: {
    width: width,
    height: 25,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },

});