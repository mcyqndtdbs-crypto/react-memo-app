import { useState,useEffect } from "react";
import "./App.css";
import MemoItem from "./MemoItem";
import MemoForm from "./MemoForm";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [memos, setMemos] = useState(() => { 
   const savedMemos = localStorage.getItem("memos");
   return savedMemos ? JSON.parse(savedMemos) : [];
});

  useEffect(() => {
  localStorage.setItem("memos", JSON.stringify(memos));
}, [memos]);


  const addMemo = () => {
    if (title === "" || content === "") return;

    //編集中なら更新
    if (editingId !== null) {
      updateMemo();
      return;
    }

    const newMemo = {
      id: crypto.randomUUID(),
      title: title,
      content: content,
    };

    setMemos([...memos, newMemo]);
    setTitle("");
    setContent("");
  };

  
  const deleteMemo = (id) => {
    const newMemos = memos.filter((memo) => memo.id !== id);
    setMemos(newMemos);
  };

  const startEdit = (memo) => {
    setTitle(memo.title);
    setContent(memo.content);
    setEditingId(memo.id);
  }

  const updateMemo = () => {
    const newMemos = memos.map((memo) => 
      memo.id === editingId
       ? { ...memo, title: title, content: content }
       : memo
    );

    setMemos(newMemos);
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="container">
      <h1>メモアプリ</h1>
      <p className="counter">{memos.length}件</p>


      <MemoForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        addMemo={addMemo}
        editingId={editingId}
      />

      <ul className="memo-list">
        {memos.length === 0 ? (
          <p className="empty-message">まだメモがありません</p>
        ) : (
          memos.map((memo) => (
            <MemoItem
              key={memo.id}
            memo={memo}
            deleteMemo={deleteMemo}
            startEdit={startEdit}
          />
        ))
      )}
      </ul>
    </div>
  );
}

export default App;