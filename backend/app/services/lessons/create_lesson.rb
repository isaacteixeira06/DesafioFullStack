module Lessons
  class CreateLesson
    def initialize(course, params, current_user)
      @course = course
      @params = params
      @current_user = current_user
    end

    def call
      raise Errors::Forbidden unless @course.creator_id == @current_user.id
      lesson = @course.lessons.new(@params)
      lesson.save!
      lesson
    end
  end
end