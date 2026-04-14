function MemoItem ({ memo, deleteMemo,startEdit}) {
    return (
        <li className="memo-item">
            <h2>{memo.title}</h2>
            <p>{memo.content}</p>

        <div className="memo-buttons">
            <button onClick={() => deleteMemo(memo.id)}>削除</button>
            <button onClick={() => startEdit(memo)}>編集</button>
        </div>
        </li>
    );
}

export default MemoItem;