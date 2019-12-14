; WIP

(load "~/quicklisp/setup.lisp")
(ql:quickload :cl-utilities)

(defun read-file-as-lines (filename)
  "Read file into a list of lines."
  (with-open-file (in filename)
    (loop for line = (read-line in nil nil)
      while line
       collect line)))

(defun part1 (opcodes)
  (let ((cursor 0) (current-value 0))
    (loop while (/= 99 current-value)
       do ()
       collect ())))

(defun main ()
  (time (part1
         (mapcar 'parse-integer
                 (cl-utilities:split-sequence #\,
                                              (reduce #'+ (read-file-as-lines (merge-pathnames "input" *DEFAULT-PATHNAME-DEFAULTS*)))
                                              )))))
