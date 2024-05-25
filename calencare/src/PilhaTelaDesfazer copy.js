class Stack {
  constructor() {
      this.items = [];
  }


  push(item) {
      this.items.push(item);
  }

  pop() {
      if (this.items.length === 0) {
          return null; 
      }
      return this.items.pop();
  }

  isEmpty() {
      return this.items.length === 0;
  }

  peek() {
      return this.items[this.items.length - 1];
  }
}

const screenStack = new Stack();


function changeScreen(newScreen) {
  const currentScreen = screenStack.peek(); 
  screenStack.push(newScreen); 
  console.log(`Mudou de ${currentScreen} para ${newScreen}`);
}

function undoScreenChange() {
  const previousScreen = screenStack.pop(); 
  const currentScreen = screenStack.peek(); 
  if (previousScreen !== null) {
      console.log(`Desfez mudança de tela de ${currentScreen} para ${previousScreen}`);
  } else {
      console.log("Não há mais mudanças de tela para desfazer.");
  }
}
export default Stack;
// changeScreen("Tela Inicial");
// changeScreen("Tela 2");
// undoScreenChange(); 

