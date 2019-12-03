(defun read-file-as-lines (filename)
  "Read file into a list of lines."
  (with-open-file (in filename)
    (loop for line = (read-line in nil nil)
      while line
       collect line)))

; Advent of Code Day 1

(defun calc-fuel (n)
  (- (floor (/ n 3)) 2))

(defun double-check-aux (total-fuel fuel)
  (let ((extra-fuel (calc-fuel fuel)))
    (if (<= extra-fuel 0)
        total-fuel
        (double-check-aux (+ extra-fuel total-fuel) extra-fuel))))

(defun double-check-fuel (n)
  (let ((fuel (calc-fuel n)))
    (double-check-aux fuel fuel)))

(defun part1 (modules)
  (reduce #'+ (mapcar 'calc-fuel modules)))

(defun part2 (modules)
  (reduce #'+ (mapcar 'double-check-fuel modules)))

(defun main ()
  (let ((modules (mapcar 'parse-integer (read-file-as-lines "~/projects/git/AdventOfCode/2019/day_1/input"))))
    ;(time (part1 modules))
    (time (part2 modules))
    ))
