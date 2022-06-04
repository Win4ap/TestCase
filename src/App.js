import React from 'react';
import './App.css';

/* Основной компонент */
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = ({change: false, reading: false})
    this.Edit = this.Edit.bind(this)
    this.Read = this.Read.bind(this)
    this.Remove = this.Remove.bind(this)
    this.Save = this.Save.bind(this)
    this.removeReadingMode = this.removeReadingMode.bind(this)
  }

  /* Меняем значение состояния, которое отвечает за окно редактирования (включение)*/
  Edit () {
    this.setState({change: true})
  }

  /* Меняем значение состояния, которое отвечает за окно чтения (включение)*/
  Read () {
    this.setState({reading: true})
  }

  /* Инициализация функции удаления из Field в App */
  /* Удаление из массива Article по индексу */
  Remove () {
    this.props.del (this.props.index)
  }

  /* Инициализация функции редактирования из Field в App */
  /* Меняем значение из массива Arcicle по индексу на новое из текстового поля (см. rendEdit) */
  /* Меняем значение состояния, которое отвечает за окно редактирования (выключение)*/
  Save () {
    this.props.update (this.refs.newTxt.value, this.props.index)
    this.setState({change: false})
  }

  /* Меняем значение состояния, которое отвечает за окно чтения (выключение)*/
  removeReadingMode () {
    this.setState({reading: false})
  }

  /* Окно обычное */
  rendNorm () {
    return (
      <div className="box">
        <div className="text">{this.props.children}</div>
        <button onClick={this.Read} className="btn light">Прочитать</button>
        <button onClick={this.Edit} className="btn light">Редактировать</button>
        <button onClick={this.Remove} className="btn red">Удалить</button>
      </div>
    );
  }

  /* Окно чтения */
  rendRead () {
    return (
      <div className="box active">
        <div className="text read">{this.props.children}</div>
        <center><button onClick={this.removeReadingMode} className="btn success">Вернуться</button></center>
      </div>
    );
  }

  /* Окно редактирования */
  rendEdit () {
    return (
      <div className="box active">
        <center><textarea ref="newTxt" defaultValue={this.props.children}></textarea></center>
        <center><button onClick={this.Save} className="btn success">Сохранить</button></center>
      </div>
    );
  }

  /* Вывод в класс Field */
  render () {
    if (this.state.change) {
      return this.rendEdit ();
    } else if (this.state.reading) {
      return this.rendRead ();
    } else  {
      return this.rendNorm ();
    }
  }
}

/* Вся техническая часть */
class Field extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      article:[]
    }
    this.deleteBlock = this.deleteBlock.bind(this)
    this.updateText = this.updateText.bind(this)
    this.eachTask = this.eachTask.bind(this)
    this.add = this.add.bind(this)
  }

  /* Добавляем новую статью в общий массив */
  add (text) {
    var arr = this.state.article;
    arr.push (text);
    this.setState({article: arr});
  }

  /* Функция удаления с подтверждением */
  deleteBlock (i) {
    /* https://stackoverflow.com/questions/44991656/no-restricted-globals */
    // eslint-disable-next-line no-restricted-globals
    var conf = confirm("Вы точно хотите удалить запись?")
    if (conf) {
      var arr = this.state.article;
      arr.splice (i, 1);
      this.setState({article: arr});
  }}

  /* Функция обновления текста после редактирования */
  updateText (text, i) {
    var arr = this.state.article;
    arr[i] = text;
    this.setState({article: arr});
    if (!arr[i]) {
      return this.deleteBlock();
    }
  }

  /* Функция вывода статьи с присвоением индекса */
  eachTask (item, i) {
    return(
      <App key={i} index={i} update={this.updateText} del={this.deleteBlock}>
        {item}
      </App>
    );
  }

  /* Вывод на экран кнопки добавления и поля для статей */
  render () {
    return (
      <div>
        <center><button onClick={this.add.bind(null, "Текст")} className="btn new">Новая статья</button></center>
        <div className="field">
          {this.state.article.map(this.eachTask)}
        </div>
      </div>
    );
  }
}

/* Экспортируем компонент Field, для использования в основном компоненте App */
export default Field;
