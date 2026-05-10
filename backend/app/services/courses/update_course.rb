module Courses
  class UpdateCourse
    def initialize(course, params, current_user)
      @course = course
      @params = params
      @current_user = current_user
    end

    def call
      raise Errors::Forbidden unless @course.creator_id == @current_user.id
      @course.update!(@params)
      @course
    end
  end
end