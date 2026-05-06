module Courses
  class CreateCourse
    def initialize(params, current_user)
      @params = params
      @current_user = current_user
    end

    def call
      course = Course.new(@params.merge(creator: @current_user))
      course.save!
      course
    end
  end
end