import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';
import axios from 'axios';


export default class MedInfoScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // show:true,
      //load: false, // should I?

      name:"",
      generic:"",
      note:"",
      sEffect:""
    };
  }
  componentDidMount(){

    // fatal props : drugName, show


    fetch('http://localhost:3000/mvp/drug/'+this.props.drugName)
      .then((data) => data.json())
      .then((data)=>{
        console.log(data)
        var obj=data[0];
        var temp={name:this.props.drugName};
        if(obj){
          temp.generic = obj.generic || "";
          temp.note = obj.patientInfo || "";
          temp.sEffect = obj.sideEffect || "";
        }
        this.setState(temp);
      });
  }

  render(){
    return (
      <Modal animationType="slide"
        height={500} width={0.9}
        modalTitle={<ModalTitle title={this.props.drugName}/>}
        visible={this.props.show}
        swipeDirection={['up', 'down']}
        swipeThreshold={100}
        onSwipeOut={this.props.modalShow}
        onTouchOutside={this.props.modalShow}
        >
        <ModalContent>
          <ScrollView>
            <View style={{flex:1, flexDirection:'row'}}>
              <Image style={{width:120, height:120}}
                source={{uri:'https://hsm.utimaco.com/wp-content/uploads/2017/09/Applications_Grey_RGB_Random_Number_Generation-300x300.png'}}/>
              <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                <Text style={{fontSize:22, paddingLeft:5}}>{this.props.drugName}</Text>
                <Text style={{fontSize:20, paddingLeft:5}}>{this.state.generic||''}</Text>
              </View>
            </View>
            <Text style={{fontSize:18, borderBottomColor:'lightgrey', borderBottomWidth:1, paddingBottom:8}}>{this.state.note||''}</Text>
            <Text style={{fontSize:18, paddingTop:8}}>{this.state.sEffect||''}</Text>
          </ScrollView>
        </ModalContent>
      </Modal>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
