function MemoForm({ title, setTitle, content, setContent, addMemo, editingId }) {
    return (
        <div className={`form-area ${editingId !== null ? "editing" : ""}`}>
            <input
                type="text"
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="本文"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={addMemo}>
                {editingId !== null ? "更新" : "追加"}
                </button>
        </div>
    );
}

export default MemoForm;