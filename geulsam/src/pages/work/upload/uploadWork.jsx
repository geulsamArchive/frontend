import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Italic, Undo, Heading, Link, List, BlockQuote, Indent } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const editorConfiguration = {
    plugins: [Heading, Bold, Italic, Link, List, BlockQuote, Undo, Indent],
    toolbar: {
        items: [

            'bold', 'italic',
            'undo', 'redo', 'outdent', 'indent'
        ],
        shouldNotGroupWhenFull: true,
    },
};

const UploadWork = () => {
    return (
        <div>

            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data="본문을 입력해주세요."
            />
        </div>
    );
};

export default UploadWork;