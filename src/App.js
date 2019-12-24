import React from 'react';
import { Table, Divider, Tag, Input , Button } from 'antd';
import {componentsProperties,  convertValueForKey, allTypes} from './const';
import 'antd/dist/antd.css';
import './App.css';


class App extends React.Component {    
  addType(type) { 
    let list = this.state && this.state.list;       
    if (!list) list = [];
    let item = {}
    item[type] = componentsProperties[type]
    list.push(item)
    let propertiesCount = this.getPropertiesMaxCount(list);
    this.setState({list, propertiesCount})
  }

  deleteRecord(index) {        
    let list = this.state && this.state.list;       
    if (!list) list = [];
    list = list.filter(function(value, tmpIndex){
      return index != tmpIndex;
    });
    let propertiesCount = this.getPropertiesMaxCount(list);
    this.setState({list, propertiesCount})
  }  

  getPropertiesMaxCount(list) {
    let max = 0
    list.forEach(item => {
      Object.keys(item).forEach(key => {
        let obj = item[key];
        if (Object.keys(obj).length > max) {
          max = Object.keys(obj).length;
        }
      })      
    })
    return max
  }

  render() {
    let columns = [{title:'类型', key:"type"}]
    let propertiesCount = this.state && this.state.propertiesCount;
    for (var i = 1; i <=  propertiesCount; i ++) {
      columns.push({title:`属性${i}`, key:`property${i}`})
    }
    columns.push({title:'action', key:'action'})
    columns = columns.map(col => {
      let item = {
        title: col.title,
        key: col.key,
        dataIndex: col.key,
      }      
      if (col.key == "action") {
        item.render = (key, record, index) => {
          return (
            <div>
              <Button onClick={() => {
                this.deleteRecord(index)
              }}>删除</Button>
            </div>
          )          
        }
      } else if (col.key.startsWith("property")) {        
        item.render = (key, record, index) => {
          let obj = record[col.key];          
          if (!obj) {            
            return <div />
          }
          let name = col.key
          if (obj) {
            let keys = Object.keys(obj)            
            if (keys.length > 0)  {
              name = keys[0]
            }            
          }
          return (
            <div>
              {name}
              <Input placeholder={name} onChange={(e) => {
                let obj = this.state.list[index];
                let key = Object.keys(obj)[0];
                obj[key][name] = convertValueForKey(name, e.currentTarget.value)
                this.state.list[index] = obj
              }} />                 
            </div>
          )
        }
      }
      return item;
    })
    let datasource = this.state && this.state.list && this.state.list.map(item => {
      let type = Object.keys(item)[0];
      let value = item[type]
      let record = {}
      record.type = type;
      Object.keys(value).forEach((k, index) => {
        let data = {}
        data[k] = value[k]
        record[`property${index+1}`] = data
      })      
      return record; 
    })  
    let content = <div />
    if (this.state && this.state.content) {
      content = (
        <div>
          {this.state.content}
        </div>
      )
    }
  
    return (
      <div>
        <Table   
          title={() => {
            let items = allTypes.map(type => {
              return (
                <Button className="default-margin" onClick={() => {
                  this.addType(type)            
                }}>{type}</Button>
              )
            });
            return (
              <div className="default-padding">
                {items}
              </div>
            )
          }}
          columns={columns} 
          dataSource={datasource}
          footer={() => {
            return (
              <div>
                <Button onClick={() => {                                    
                  this.setState({content: JSON.stringify(this.state.list)})
                  fetch('http://localhost:3005/save', {method: 'POST', body: JSON.stringify(this.state.list)}).then(res => {
                    console.log(res)
                  })
                }}>内容</Button>
              </div>
            )            
          }}
        />
        {content}        
      </div>
    )
  }
}

export default App;
