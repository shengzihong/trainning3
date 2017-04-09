import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

let { height, width } = Dimensions.get('window');

export default class LongPage extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isToTopShown: false
    };
  }

  render () {

    const isToTopShown = this.state.isToTopShown;

    return (
      <View>
        <ScrollView
         ref = 'myScrollView'
         style = {styles.scrollView}
         // pagingEnabled = {true}
         onScroll = {(event) => {

           const isCloseToBottom = event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - 20;
           const isDown = event.nativeEvent.contentOffset.y > this.offset;
           this.offset = event.nativeEvent.contentOffset.y;

           // isDown 向下就显示
           // isCloseToBottom 到达底部也显示, 避免小错误
           // this.offset 如果一开始往上拉, 会出现, 这是错误的, 所以必须大于1
           if ((isDown || isCloseToBottom) && this.offset > 1) {
             this.setState({
               isToTopShown: true
             });
           } else {
             this.setState({
               isToTopShown: false
             });
           }
           
         }}
         scrollEventThrottle = {1}
        >
          <Text>
          The earliest foundations of what would become computer science predate the invention of the modern digital computer. Machines for calculating fixed numerical tasks such as the abacus have existed since antiquity, aiding in computations such as multiplication and division. Further, algorithms for performing computations have existed since antiquity, even before the development of sophisticated computing equipment.
    Wilhelm Schickard designed and constructed the first working mechanical calculator in 1623.[4] In 1673, Gottfried Leibniz demonstrated a digital mechanical calculator, called the Stepped Reckoner.[5] He may be considered the first computer scientist and information theorist, for, among other reasons, documenting the binary number system. In 1820, Thomas de Colmar launched the mechanical calculator industry[note 1] when he released his simplified arithmometer, which was the first calculating machine strong enough and reliable enough to be used daily in an office environment. Charles Babbage started the design of the first automatic mechanical calculator, his Difference Engine, in 1822, which eventually gave him the idea of the first programmable mechanical calculator, his Analytical Engine.[6] He started developing this machine in 1834, and "in less than two years, he had sketched out many of the salient features of the modern computer".[7] "A crucial step was the adoption of a punched card system derived from the Jacquard loom"[7] making it infinitely programmable.[note 2] In 1843, during the translation of a French article on the Analytical Engine, Ada Lovelace wrote, in one of the many notes she included, an algorithm to compute the Bernoulli numbers, which is considered to be the first computer program.[8] Around 1885, Herman Hollerith invented the tabulator, which used punched cards to process statistical information; eventually his company became part of IBM. In 1937, one hundred years after Babbage's impossible dream, Howard Aiken convinced IBM, which was making all kinds of punched card equipment and was also in the calculator business[9] to develop his giant programmable calculator, the ASCC/Harvard Mark I, based on Babbage's Analytical Engine, which itself used cards and a central computing unit. When the machine was finished, some hailed it as "Babbage's dream come true".[10]
    During the 1940s, as new and more powerful computing machines were developed, the term computer came to refer to the machines rather than their human predecessors.[11] As it became clear that computers could be used for more than just mathematical calculations, the field of computer science broadened to study computation in general. Computer science began to be established as a distinct academic discipline in the 1950s and early 1960s.[12][13] The world's first computer science degree program, the Cambridge Diploma in Computer Science, began at the University of Cambridge Computer Laboratory in 1953. The first computer science degree program in the United States was formed at Purdue University in 1962.[14] Since practical computers became available, many applications of computing have become distinct areas of study in their own rights.
    Although many initially believed it was impossible that computers themselves could actually be a scientific field of study, in the late fifties it gradually became accepted among the greater academic population.[15][16] It is the now well-known IBM brand that formed part of the computer science revolution during this time. IBM (short for International Business Machines) released the IBM 704[17] and later the IBM 709[18] computers, which were widely used during the exploration period of such devices. "Still, working with the IBM [computer] was frustrating […] if you had misplaced as much as one letter in one instruction, the program would crash, and you would have to start the whole process over again".[15] During the late 1950s, the computer science discipline was very much in its developmental stages, and such issues were commonplace.[16]
    Time has seen significant improvements in the usability and effectiveness of computing technology.[19] Modern society has seen a significant shift in the users of computer technology, from usage only by experts and professionals, to a near-ubiquitous user base. Initially, computers were quite costly, and some degree of human aid was needed for efficient use—in part from professional computer operators. As computer adoption became more widespread and affordable, less human assistance was needed for common usage.
          </Text>
        </ScrollView>

        {
         // 根据这个state, 是否显示TOP按钮
         isToTopShown
         ?
         <TouchableWithoutFeedback onPress={() => {
            this.refs.myScrollView.scrollTo({
              x: 0,
              y: 0,
              animated: true
            });
          }}
         >
           <View style = {styles.toTop}>
             <Text>
               置顶
             </Text>
           </View>
         </TouchableWithoutFeedback>
         :
         null
        }

      </View>

    );

  }
}

const styles = StyleSheet.create({

  scrollView: {
    margin: 20
  },

  toTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    top: height - 50 - 20,
    left: width - 50 - 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1
  }

});